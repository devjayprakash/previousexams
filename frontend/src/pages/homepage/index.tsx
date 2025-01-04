import AppLayout from "../../layouts/AppLayout";
import HomePageHeader from "../../components/header/HomePageHeader";

const Homepage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-6">
        <HomePageHeader />
      </div>
    </AppLayout>
  );
};

export default Homepage;
