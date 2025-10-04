import Header from "@/components/layout/Header";
import UsersList from "@/components/users/UserList";

export const metadata = {
  title: "Users",
};

export default function UsersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto">
        <UsersList />
      </div>
    </main>
  );
}
