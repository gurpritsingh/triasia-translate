import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Heart, TrendingUp } from "lucide-react";

const LanguagesSection = () => {
  const koreanServices = [
    "한국어 ↔ English", "한국어 ↔ Hindi", "한국어 ↔ Tamil", "한국어 ↔ Telugu", 
    "한국어 ↔ Bengali", "한국어 ↔ Marathi", "한국어 ↔ Gujarati"
  ];

  const chineseServices = [
    "中文 ↔ English", "中文 ↔ Hindi", "中文 ↔ Tamil", "中文 ↔ Telugu", 
    "中文 ↔ Bengali", "中文 ↔ Marathi", "中文 ↔ Gujarati", "中文 ↔ Punjabi"
  ];

  const popularLanguages = [
    "English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Punjabi",
    "Kannada", "Malayalam", "Odia", "Assamese", "Urdu", "Spanish", "French", "German",
    "Japanese", "Arabic", "Russian", "Portuguese", "Italian", "Dutch", "Thai", "Vietnamese"
  ];

  return (
    <section id="languages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            120+ Languages Supported
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specializing in Korean and Chinese translations while supporting a comprehensive 
            range of Indian Regional, European, and Asian languages.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Korean Specialization */}
          <Card className="bg-gradient-to-br from-korean-red/5 to-korean-red/10 border-korean-red/20 shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-korean-red/10 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-korean-red" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Korean Specialization</CardTitle>
                  <p className="text-sm text-muted-foreground">한국어 전문 번역</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {koreanServices.map((service, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2 border-korean-red/30 text-korean-red">
                    {service}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Expert Korean linguists with deep cultural understanding and technical expertise.
              </p>
            </CardContent>
          </Card>

          {/* Chinese Specialization */}
          <Card className="bg-gradient-to-br from-chinese-gold/5 to-chinese-gold/10 border-chinese-gold/20 shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-chinese-gold/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-chinese-gold" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Chinese Specialization</CardTitle>
                  <p className="text-sm text-muted-foreground">中文专业翻译</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {chineseServices.map((service, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2 border-chinese-gold/30 text-chinese-gold">
                    {service}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Native Chinese speakers with expertise in Simplified and Traditional Chinese.
              </p>
            </CardContent>
          </Card>

          {/* All Languages */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Global Coverage</CardTitle>
                  <p className="text-sm text-muted-foreground">120+ Languages</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {popularLanguages.map((language, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {language}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Complete language coverage for all your translation needs.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-card rounded-2xl p-8 shadow-elegant">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Don't See Your Language?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We work with a network of certified translators covering rare and regional languages. 
              Contact us for specialized language requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="border-korean-red text-korean-red px-4 py-2">
                Korean Dialects
              </Badge>
              <Badge variant="outline" className="border-chinese-gold text-chinese-gold px-4 py-2">
                Regional Chinese
              </Badge>
              <Badge variant="outline" className="border-primary text-primary px-4 py-2">
                Indian Tribal Languages
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;