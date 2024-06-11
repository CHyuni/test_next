import Image from "next/image";

export default function envtest() {
  return (
    <div>
      <p>region: {process.env.DEFAULT_REGION}</p>
      <p>bucket: {process.env.S3_BUCKET_NAME}</p>
      <p>user_pool: {process.env.USER_POOL_ID}</p>
      <p>identity_pool: {process.env.IDENTITY_POOL_ID}</p>
      <p>user_pool_client_id: {process.env.APP_CLIENT_ID}</p>
    </div>
  );
}
