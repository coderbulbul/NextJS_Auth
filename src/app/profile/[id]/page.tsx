export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile child Page
        <span className="p-2 bg-orange-500">{params.id}</span>
      </p>
    </div>
  );
}
