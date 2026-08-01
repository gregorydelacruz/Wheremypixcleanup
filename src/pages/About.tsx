
import Navbar from '@/components/Navbar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const About = () => {
  const teamMembers = [
    {
      name: "Gregory de la Cruz",
      role: "Founder & Managing Director",
      bio: "Gregory founded Where My Pix after experiencing firsthand the frustration of searching through thousands of disorganized photos. With a background in computer science and image processing, Alex assembled a team of experts to create an elegant solution.",
      avatar: "/team/gregory.jpg" // ← now served statically
    },
    {
      name: "Maya Rodriguez",
      role: "Lead Developer",
      bio: "Maya is a full-stack developer with 10 years of experience in image recognition systems. She leads our development team and is responsible for creating the algorithms that power our photo organization service.",
      avatar: "/placeholder.svg" 
    },
    {
      name: "Sam Taylor",
      role: "UX/UI Designer",
      bio: "Sam ensures that every user interaction with Where My Pix is intuitive and pleasant. With a keen eye for detail and user-centered approach, Sam has crafted our sleek, accessible interface.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Jamie Lee",
      role: "AI Specialist",
      bio: "Jamie specializes in machine learning and artificial intelligence. Their work enables our service to accurately categorize and tag photos, continuously improving through user feedback.",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      <SEO
        title="About Where My Pix — Our Story & Team"
        description="Meet the team behind Where My Pix and learn how we built an AI service to organize and rename your photo library."
        keywords={["about where my pix", "photo organizer team", "our story"]}
        canonicalUrl="https://stripe-price-magic-58.lovable.app/about"
      />
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
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 text-white">About Where My Pix</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We're on a mission to bring order to digital chaos and help you rediscover your valuable memories.
            </p>
          </div>
          
          <Separator className="mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Our Story</h2>
              <p className="text-white/80">
                Where My Pix was born out of a universal frustration: the struggle to find that one photo you know exists—but is buried somewhere in a chaotic mess of cryptically named files like “IMG_5921.jpg” or “DCIM_20210314_845.JPG.” Sound familiar?
                It started with a simple moment—a founder trying to find an old photo of their grandmother holding their childhood dog. They remembered the moment vividly, but after scrolling through tens of thousands of photos on their phone, laptop, and old hard drive, they gave up. The image was lost in a sea of poorly named files and scattered folders.
              </p>
              <p className="text-white/80">
                Founded in 2025, our team of developers, designers, and AI specialists set out to solve this universal problem by creating a service that would intelligently organize and rename photos, making them easily searchable and accessible.
              </p>
              <p className="text-white/80">
                What started as a passion project has grown into a comprehensive solution used by thousands of people worldwide to bring order to their digital memories.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
              <p className="text-white/80">
                We believe your memories deserve more than being lost in a maze of unnamed files and scattered folders. Your photos should be easy to find, meaningful to look at, and ready to share when you need them most.

Our mission is to make photo organization effortless—so you can spend less time searching and more time reliving the moments that matter.
              </p>
              <p className="text-white/80">
                We're committed to:
              </p>
              <ul className="list-disc pl-6 text-white/80 space-y-2">
                <li>Respecting your privacy and the security of your personal data</li>
                <li>Creating technology that serves human needs and enhances your life</li>
                <li>Continuously improving our services based on user feedback</li>
                <li>Making advanced photo organization accessible to everyone</li>
              </ul>
 <p className="text-white/80">
              "Because behind every photo is a story worth finding."
   </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-center mb-8 text-white">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex gap-4 items-start p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-white">{member.name}</h3>
                  <p className="text-sm text-blue-200 mb-2">{member.role}</p>
                  <p className="text-white/80 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg text-center border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-white">Join Our Journey</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for organization and technology. If you're interested in joining our team, please reach out to us.
            </p>
            <a href="/contact" className="text-blue-200 font-medium hover:underline">Get in touch →</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
