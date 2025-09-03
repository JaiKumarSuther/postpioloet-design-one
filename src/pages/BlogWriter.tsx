import { useState, useEffect, Suspense } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Globe, Lightbulb, TrendingUp, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import ThreeBackground from "@/components/ThreeBackground";

const BlogWriter = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [selectedTrend, setSelectedTrend] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

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
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      navigate("/output", {
        state: { selectedOption, websiteUrl, customTopic, selectedTrend, region, category },
      });
    }, 2000);
  };

  const hostname = (() => {
    try {
      const u = new URL(websiteUrl);
      return u.hostname.replace("www.", "");
    } catch {
      return websiteUrl;
    }
  })();

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, value: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedOption(value);
    }
  };

  const optionCardBase = "flex items-center space-x-3 p-4 rounded-xl border transition-all bg-card/40 cursor-pointer";

  return (
    <div className="min-h-screen relative overflow-hidden pt-20 pb-16">
      {/* Animated Three.js background */}
      <Suspense fallback={<div className="fixed inset-0 bg-background -z-10" />}> 
        <ThreeBackground />
      </Suspense>

      {/* Subtle animated overlays */}
      <div className="absolute inset-0 bg-gradient-glow opacity-40"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 max-w-4xl relative">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
          <img src="/assets/postpilot-logo.png" alt="PostPilot.AI" className="w-40 rounded" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs md:text-sm">
            <Sparkles className="w-4 h-4" />
            Guided mode
          </div>
          {selectedOption === "website" && hostname && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-primary/10 text-purple-primary border border-purple-primary/20 text-xs md:text-sm">
              Target: {hostname}
            </div>
          )}
        </div>

        <div className="card-gradient rounded-2xl p-8 mb-8 animate-fade-in shadow-glow">
          <div className="mb-8">
            <Label className="text-lg font-semibold mb-4 block">Write blog on basis of:</Label>
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
              <div
                className={`${optionCardBase} ${selectedOption === "website" ? "border-primary/60 shadow-glow" : "border-border hover:border-primary/50"}`}
                onClick={() => setSelectedOption("website")}
                onKeyDown={(e) => handleCardKeyDown(e, "website")}
                role="button"
                tabIndex={0}
              >
                <RadioGroupItem value="website" id="website" />
                <Globe className="w-5 h-5 text-primary" />
                <Label htmlFor="website" className="cursor-pointer flex-1">
                  <div>
                    <div className="font-semibold flex items-center gap-2">Website URL {selectedOption === "website" && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary">Selected</span>}</div>
                    <div className="text-sm text-muted-foreground">Analyze and create content based on an existing website</div>
                  </div>
                </Label>
              </div>

              <div
                className={`${optionCardBase} ${selectedOption === "custom" ? "border-primary/60 shadow-glow" : "border-border hover:border-primary/50"}`}
                onClick={() => setSelectedOption("custom")}
                onKeyDown={(e) => handleCardKeyDown(e, "custom")}
                role="button"
                tabIndex={0}
              >
                <RadioGroupItem value="custom" id="custom" />
                <Lightbulb className="w-5 h-5 text-primary" />
                <Label htmlFor="custom" className="cursor-pointer flex-1">
                  <div>
                    <div className="font-semibold flex items-center gap-2">Custom Topic {selectedOption === "custom" && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary">Selected</span>}</div>
                    <div className="text-sm text-muted-foreground">Provide your own topic or idea for the blog post</div>
                  </div>
                </Label>
              </div>

              <div
                className={`${optionCardBase} ${selectedOption === "trending" ? "border-primary/60 shadow-glow" : "border-border hover:border-primary/50"}`}
                onClick={() => setSelectedOption("trending")}
                onKeyDown={(e) => handleCardKeyDown(e, "trending")}
                role="button"
                tabIndex={0}
              >
                <RadioGroupItem value="trending" id="trending" />
                <TrendingUp className="w-5 h-5 text-primary" />
                <Label htmlFor="trending" className="cursor-pointer flex-1">
                  <div>
                    <div className="font-semibold flex items-center gap-2">Auto-Trending Search {selectedOption === "trending" && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary">Selected</span>}</div>
                    <div className="text-sm text-muted-foreground">Choose from AI-curated trending topics</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {selectedOption === "website" && (
            <div className="mb-6 animate-slide-in">
              <Label htmlFor="url" className="block mb-2 font-semibold">Website URL</Label>
              <Input id="url" type="url" placeholder="https://example.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className="bg-card/40 border border-border hover:border-primary/50 focus:border-primary placeholder:text-muted-foreground" />
            </div>
          )}

          {selectedOption === "custom" && (
            <div className="mb-6 animate-slide-in">
              <Label htmlFor="topic" className="block mb-2 font-semibold">Custom Topic</Label>
              <Input id="topic" type="text" placeholder="Enter your blog topic or idea..." value={customTopic} onChange={(e) => setCustomTopic(e.target.value)} className="bg-card/40 border border-border hover:border-primary/50 focus:border-primary placeholder:text-muted-foreground" />
            </div>
          )}

          {selectedOption === "trending" && (
            <div className="mb-6 animate-slide-in">
              <Label className="block mb-4 font-semibold">Top 10 Trending Topics</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {trendingTopics.map((topic, index) => {
                  const active = selectedTrend === topic;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedTrend(topic)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${active ? "border-primary bg-primary/20 text-primary" : "border-border hover:border-primary hover:bg-primary/10"}`}
                    >
                      <span className="mr-3">{topic}</span>
                      {active && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="region" className="font-semibold">Region</Label>
                <span className="text-xs text-muted-foreground">(Optional)</span>
              </div>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-card/40 border border-border hover:border-primary/50 focus:border-primary">
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="category" className="font-semibold">Domain Category</Label>
                <span className="text-xs opacity-0">(Optional)</span>
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-card/40 border border-border hover:border-primary/50 focus:border-primary">
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

          <Button onClick={handleSubmit} disabled={isGenerating} className={`w-full button-gradient text-lg py-6 rounded-lg font-semibold text-primary-foreground transition-all ${isGenerating ? "opacity-80 cursor-not-allowed" : "hover:scale-105"}`}>
            {isGenerating ? "Generating..." : "Generate Blog Post"} {!isGenerating && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogWriter;
