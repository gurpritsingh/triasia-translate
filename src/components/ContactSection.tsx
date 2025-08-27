import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Upload,
  MessageCircle,
  Users
} from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Get Your Translation Quote
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your translation project? Contact us for a free quote and 
            professional consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center space-x-2">
                  <Send className="h-6 w-6 text-primary" />
                  <span>Request Free Quote</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Full Name *
                    </label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Company/Organization
                    </label>
                    <Input placeholder="Company name (optional)" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Source Language
                    </label>
                    <Input placeholder="e.g., English, Korean" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Target Language
                    </label>
                    <Input placeholder="e.g., Chinese, Hindi" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Document Type
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Legal Documents
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-korean-red hover:text-white">
                      Educational Certificates
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-chinese-gold hover:text-foreground">
                      Technical Manuals
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Business Documents
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                      Personal Documents
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Project Details
                  </label>
                  <Textarea 
                    placeholder="Please describe your translation requirements, timeline, and any specific instructions..."
                    rows={4}
                  />
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your documents (Optional)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose Files
                  </Button>
                </div>

                <Button variant="hero" size="lg" className="w-full text-lg">
                  Get Free Quote Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-korean-red mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">+91-XXX-XXX-XXXX</p>
                    <p className="text-muted-foreground">+91-XXX-XXX-XXXX</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-chinese-gold mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">triasiaglobal@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      123 Business District,<br />
                      New Delhi, India - 110027
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-korean-blue mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Business Hours</p>
                    <p className="text-muted-foreground">Mon-Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Sat: 10:00 AM - 4:00 PM</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Emergency services available 24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-korean-red/5 to-chinese-gold/5 border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span>Quick Response Guarantee</span>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-korean-red rounded-full"></div>
                    <span>Quote within 2 hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-chinese-gold rounded-full"></div>
                    <span>Project start within 24 hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>24/7 support for urgent requests</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-korean-blue/5 border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Trusted by 500+ Clients</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Government Agencies</Badge>
                  <Badge variant="secondary">Universities</Badge>
                  <Badge variant="secondary">Law Firms</Badge>
                  <Badge variant="secondary">Corporations</Badge>
                  <Badge variant="secondary">Individuals</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;