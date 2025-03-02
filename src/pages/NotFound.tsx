
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md px-6 animate-scale-in">
          <div className="mx-auto w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-5xl font-light text-primary">404</span>
          </div>
          
          <h1 className="text-4xl font-medium">Page not found</h1>
          
          <p className="text-muted-foreground">
            We couldn't find the page you were looking for. Please check the URL or return to the home page.
          </p>
          
          <Button 
            asChild
            className="mt-4 bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
