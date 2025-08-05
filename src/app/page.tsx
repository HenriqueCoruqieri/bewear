import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <div>
      <h1 className="text-red-500 text-3xl font-bold">Pressione o botão abaixo</h1>
      <Button>Press</Button>
    </div>
  );
};

export default Home;
