import PageContainer from "@/components/layout/page-container";
import ProfilePage from "@/sections/profile/profilePage";

export default function () {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <ProfilePage />
      </div>
    </PageContainer>
  );
}