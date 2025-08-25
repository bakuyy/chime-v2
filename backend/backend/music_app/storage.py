from storages.backends.s3boto3 import S3Boto3Storage
import logging
import boto3
from botocore.exceptions import ClientError
import os
import mimetypes

logger = logging.getLogger(__name__)

class CustomS3Boto3Storage(S3Boto3Storage):
    def _save(self, name, content):
        print("\n=== Custom S3 Storage Save ===")
        print(f"File name: {name}")
        print(f"Content type: {getattr(content, 'content_type', 'unknown')}")
        print(f"Content size: {content.size}")
        
        try:
            # Create S3 client with explicit credentials
            s3_client = boto3.client(
                's3',
                aws_access_key_id=self.access_key,
                aws_secret_access_key=self.secret_key,
                region_name=self.region_name
            )
            
            # Save content to a temporary file
            temp_path = f"/tmp/{os.path.basename(name)}"
            with open(temp_path, 'wb') as f:
                f.write(content.read())
            
            print(f"Temporary file created at: {temp_path}")
            print(f"File size on disk: {os.path.getsize(temp_path)}")
            
            # Determine content type if not provided
            content_type = getattr(content, 'content_type', None)
            if not content_type:
                content_type, _ = mimetypes.guess_type(name)
                if not content_type:
                    content_type = 'application/octet-stream'
            print(f"Using content type: {content_type}")
            
            # Upload to S3 with explicit ACL
            try:
                with open(temp_path, 'rb') as f:
                    response = s3_client.put_object(
                        Bucket=self.bucket_name,
                        Key=name,
                        Body=f,
                        ACL='public-read',
                        ContentType=content_type,
                        Metadata={
                            'Content-Type': content_type
                        }
                    )
                print(f"S3 Put Object Response: {response}")
                
                # Verify the upload
                try:
                    response = s3_client.head_object(
                        Bucket=self.bucket_name,
                        Key=name
                    )
                    print(f"S3 Head Object Response: {response}")
                    print(f"File exists in S3: True")
                    print(f"File size in S3: {response['ContentLength']}")
                    
                    # Generate a presigned URL
                    url = s3_client.generate_presigned_url(
                        'get_object',
                        Params={
                            'Bucket': self.bucket_name,
                            'Key': name
                        },
                        ExpiresIn=3600
                    )
                    print(f"Presigned URL: {url}")
                    
                    # Clean up temporary file
                    os.remove(temp_path)
                    print("Temporary file removed")
                    
                    return name
                    
                except ClientError as e:
                    print(f"Error verifying upload: {str(e)}")
                    print(f"Error code: {e.response['Error']['Code']}")
                    print(f"Error message: {e.response['Error']['Message']}")
                    raise
                    
            except ClientError as e:
                print(f"Error uploading to S3: {str(e)}")
                print(f"Error code: {e.response['Error']['Code']}")
                print(f"Error message: {e.response['Error']['Message']}")
                raise
                
        except Exception as e:
            print(f"Error in _save: {str(e)}")
            raise 