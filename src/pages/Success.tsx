import Navbar from '@/components/Navbar';

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-28 pb-16 md:pb-20 flex items-center justify-center">
        <div className="container max-w-lg mx-auto text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold">Success!</h1>
          <p className="text-muted-foreground">
            Your action was completed successfully.
          </p>

          <a
            href="/upload"
            className="inline-block px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
          >
            Go to Uploads
          </a>
        </div>
      </main>
    </div>
  );
};

export default Success;
