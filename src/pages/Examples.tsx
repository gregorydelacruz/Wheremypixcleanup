import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import familyPhotos from '@/assets/examples/family-photos.jpg';
import travelPhotos from '@/assets/examples/travel-photos.jpg';
import projectPhotos from '@/assets/examples/project-photos.jpg';
import eventPhotos from '@/assets/examples/event-photos.jpg';
import productPhotos from '@/assets/examples/product-photos.jpg';
import archivePhotos from '@/assets/examples/archive-photos.jpg';

const Examples = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] to-[#0056b3]" />
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <main className="flex-1 pt-28 pb-20 relative z-10">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-roboto font-bold mb-8 text-center text-white">Example Use Cases</h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-white/80">
            Discover how our service can transform your photo organization. 
            Browse through these real-world scenarios showing the power of Where My Pix.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {examples.map((example, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-white/20 bg-white/10 backdrop-blur-md">
                    <CardHeader className="text-center">
                      <CardTitle className="font-roboto text-white">{example.title}</CardTitle>
                      <CardDescription className="text-white/80">{example.shortDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
                        <img 
                          src={example.image} 
                          alt={example.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-white/80">{example.description}</p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{example.title}</h4>
                    <p className="text-sm">
                      {example.hoverDescription}
                    </p>
                    <div className="flex justify-end">
                      <Link to="/upload" className="text-xs text-primary hover:underline">
                        Try it now
                      </Link>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const examples = [
  {
    title: "Family Photo Organization",
    shortDesc: "Sort family photos by event and date",
    description: "Automatically organize thousands of family photos by events, dates, and people. Makes creating family albums a breeze.",
    hoverDescription: "Upload your family photos and get them organized into folders by event, date, and people, making it easy to create albums and find specific memories.",
    image: familyPhotos
  },
  {
    title: "Travel Collections",
    shortDesc: "Organize photos by destination",
    description: "Group travel photos by location, landmarks, and activities. Perfect for creating travel blogs or sharing vacation memories.",
    hoverDescription: "Upload your travel photos and get them organized by destination, landmarks, and activities, making it easy to create travel blogs or share vacation memories.",
    image: travelPhotos
  },
  {
    title: "Project Documentation",
    shortDesc: "Organize project progress photos",
    description: "Keep track of project progress by organizing photos chronologically. Great for construction, DIY, or creative projects.",
    hoverDescription: "Upload your project photos and get them organized chronologically, making it easy to document and share your progress from start to finish.",
    image: projectPhotos
  },
  {
    title: "Event Photography",
    shortDesc: "Sort photos by guests and activities",
    description: "Perfect for professional photographers. Organize event photos by guests, activities, or specific moments.",
    hoverDescription: "Upload your event photos and get them organized by guests, activities, and specific moments, making it easy to deliver organized sets to clients.",
    image: eventPhotos
  },
  {
    title: "Product Photography",
    shortDesc: "Organize product shots by category",
    description: "Group product photos by category, making it easy to manage your e-commerce imagery and keep product listings updated.",
    hoverDescription: "Upload your product photos and get them organized by category, making it easy to manage your e-commerce imagery and keep product listings updated.",
    image: productPhotos
  },
  {
    title: "Photo Archiving",
    shortDesc: "Create a searchable photo archive",
    description: "Convert your unorganized photo collection into a searchable archive with custom tags and categories for easy retrieval.",
    hoverDescription: "Upload your photo collection and get a searchable archive with custom tags and categories, making it easy to find specific photos when you need them.",
    image: archivePhotos
  }
];

export default Examples;
