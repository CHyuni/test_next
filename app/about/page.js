import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p>region: {process.env.DEFAULT_REGION}</p>
      <p>bucket: {precoess.env.S3_BUCKET_NAME}</p>
      {/* <p>user_pool: {process.env.USER_POOL_ID}</p> */}
    </div>
  );
}
