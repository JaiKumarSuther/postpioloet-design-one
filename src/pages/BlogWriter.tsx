import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Globe, Lightbulb, TrendingUp, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const BlogWriter = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [selectedTrend, setSelectedTrend] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  // Prefill websiteUrl if present in query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const url = params.get("url");
    if (url) {
      setSelectedOption("website");
      setWebsiteUrl(url);
    }
  }, [location.search]);

  const trendingTopics = [
    "AI in Healthcare Revolution",
    "Sustainable Technology Trends",
    "Remote Work Future",
    "Cryptocurrency Updates",
    "Climate Change Solutions",
    "Mental Health Awareness",
    "E-commerce Innovation",
    "Digital Marketing 2024",
    "Cybersecurity Threats",
    "Green Energy Transition",
  ];

  const regions = [
    "Global",
    "North America",
    "Europe",
    "Asia Pacific",
    "Latin America",
    "Middle East & Africa",
  ];

  const categories = [
    "Technology",
    "Business",
    "Health & Fitness",
    "Finance",
    "Education",
    "Entertainment",
    "Travel",
    "Food & Lifestyle",
    "Sports",
    "Politics",
    "E-commerce",
    "Marketing",
  ];

  const handleSubmit = () => {
    if (!selectedOption) {
      toast({ title: "Selection Required", description: "Please select a blog writing option.", variant: "destructive" });
      return;
    }

    if (selectedOption === "website" && !websiteUrl) {
      toast({ title: "URL Required", description: "Please enter a website URL.", variant: "destructive" });
      return;
    }

    if (selectedOption === "custom" && !customTopic) {
      toast({ title: "Topic Required", description: "Please enter a custom topic.", variant: "destructive" });
      return;
    }

    if (selectedOption === "trending" && !selectedTrend) {
      toast({ title: "Topic Required", description: "Please select a trending topic.", variant: "destructive" });
      return;
    }

    toast({ title: "Generating Blog", description: "AI is creating your blog post..." });

    setTimeout(() => {
      navigate("/output", {
        state: { selectedOption, websiteUrl, customTopic, selectedTrend, region, category },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="h-6 w-px bg-border"></div>
          <div className="flex items-center gap-3">
            <img src="/assets/postpilot-logo.png" alt="PostPilot.AI" className="w-40 rounded" />
  
          </div>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <p className="text-xl text-muted-foreground">
            Tell us what you want to write about, and our AI will create engaging content for you
          </p>
        </div>

        <div className="card-gradient rounded-2xl p-8 mb-8 animate-fade-in">
          <div className="mb-8">
            <Label className="text-lg font-semibold mb-4 block">Write blog on basis of:</Label>
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <RadioGroupItem value="website" id="website" />
                <Globe className="w-5 h-5 text-primary" />
                <Label htmlFor="website" className="cursor-pointer flex-1">
                  <div>
                    <div className="font-semibold">Website URL</div>
                    <div className="text-sm text-muted-foreground">Analyze and create content based on an existing website</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <RadioGroupItem value="custom" id="custom" />
                <Lightbulb className="w-5 h-5 text-primary" />
                <Label htmlFor="custom" className="cursor-pointer flex-1">
                  <div>
                    <div className="font-semibold">Custom Topic</div>
                    <div className="text-sm text-muted-foreground">Provide your own topic or idea for the blog post</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <RadioGroupItem value="trending" id="trending" />
                <TrendingUp className="w-5 h-5 text-primary" />
                <Label htmlFor="trending" className="cursor-pointer flex-1">
                  <div>
                    <div className="font-semibold">Auto-Trending Search</div>
                    <div className="text-sm text-muted-foreground">Choose from AI-curated trending topics</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {selectedOption === "website" && (
            <div className="mb-6 animate-slide-in">
              <Label htmlFor="url" className="block mb-2 font-semibold">Website URL</Label>
              <Input id="url" type="url" placeholder="https://example.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className="bg-input border-border focus:border-primary" />
            </div>
          )}

          {selectedOption === "custom" && (
            <div className="mb-6 animate-slide-in">
              <Label htmlFor="topic" className="block mb-2 font-semibold">Custom Topic</Label>
              <Input id="topic" type="text" placeholder="Enter your blog topic or idea..." value={customTopic} onChange={(e) => setCustomTopic(e.target.value)} className="bg-input border-border focus:border-primary" />
            </div>
          )}

          {selectedOption === "trending" && (
            <div className="mb-6 animate-slide-in">
              <Label className="block mb-4 font-semibold">Top 10 Trending Topics</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {["AI in Healthcare Revolution","Sustainable Technology Trends","Remote Work Future","Cryptocurrency Updates","Climate Change Solutions","Mental Health Awareness","E-commerce Innovation","Digital Marketing 2024","Cybersecurity Threats","Green Energy Transition"].map((topic, index) => (
                  <button key={index} onClick={() => setSelectedTrend(topic)} className={`p-3 rounded-lg border text-left transition-all hover:border-primary hover:bg-primary/10 ${selectedTrend === topic ? "border-primary bg-primary/20 text-primary" : "border-border"}`}>
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <Label htmlFor="region" className="block mb-2 font-semibold">
                Region <span className="text-sm text-muted-foreground">(Optional)</span>
              </Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {["Global","North America","Europe","Asia Pacific","Latin America","Middle East & Africa"].map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category" className="block mb-2 font-semibold">Domain Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {["Technology","Business","Health & Fitness","Finance","Education","Entertainment","Travel","Food & Lifestyle","Sports","Politics","E-commerce","Marketing"].map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full button-gradient text-lg py-6 rounded-lg font-semibold text-primary-foreground hover:scale-105 transition-all">
            Generate Blog Post <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogWriter;
