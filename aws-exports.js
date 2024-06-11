const awsconfig = {
	"aws_project_region": process.env.DEFAULT_REGION,
	"aws_user_files_s3_bucket": process.env.S3_BUCKET_NAME,
	"aws_user_files_s3_bucket_region": process.env.DEFAULT_REGION,
	"aws_user_pools_id": process.env.USER_POOL_ID,
	"aws_user_pools_web_client_id": process.env.APP_CLIENT_ID,
	"aws_cognito_identity_pool_id": process.env.IDENTITY_POOL_ID,
	"aws_cognito_region": process.env.DEFAULT_REGION
}
export default awsconfig;