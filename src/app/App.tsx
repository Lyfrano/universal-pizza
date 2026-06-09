import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Calendar } from "./components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Badge } from "./components/ui/badge";
import { Pizza, Clock, MapPin, Phone, Calendar as CalendarIcon, ShoppingCart, Star } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

export default function App() {
  const [selectedDate, setSelectedDate] = useState("");;
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [cart, setCart] = useState<Array<{id: number, name: string, price: number, quantity: number}>>([]);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  const menuItems = [
    { id: 1, name: "Pepperoni Pizza", price: 7.99, description: "Classic pepperoni with mozzarella" },
    { id: 2, name: "Slice + Can", price: 6.49, description: "Single slice with soft drink" },
    { id: 3, name: "Margherita Pizza", price: 8.99, description: "Fresh basil, tomato, and mozzarella" },
    { id: 4, name: "Vegetarian Pizza", price: 9.49, description: "Loaded with fresh vegetables" },
    { id: 5, name: "Meat Lovers Pizza", price: 11.99, description: "Pepperoni, sausage, ham, and bacon" },
    { id: 6, name: "Hawaiian Pizza", price: 9.99, description: "Ham and pineapple" },
  ];

  const addToCart = (item: typeof menuItems[0]) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? {...cartItem, quantity: cartItem.quantity + 1}
          : cartItem
      ));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#f6f1e2]">
      {/* Checkered Side Borders */}
      <div className="fixed left-0 top-0 bottom-0 w-12 md:w-20 z-50 pointer-events-none border-r-4 border-white" style={{
        backgroundImage: `repeating-conic-gradient(#d32f2f 0% 25%, #ffffff 0% 50%)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0'
      }}></div>

      <div className="fixed right-0 top-0 bottom-0 w-12 md:w-20 z-50 pointer-events-none border-l-4 border-white" style={{
        backgroundImage: `repeating-conic-gradient(#d32f2f 0% 25%, #ffffff 0% 50%)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0'
      }}></div>

      {/* Main Content Area */}
      <div className="mx-12 md:mx-20">
        {/* Header */}
        <div className="relative bg-[#d32f2f] border-b-8 border-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Pizza className="h-12 w-12 text-white" />
                <h1 className="text-4xl md:text-5xl  text-white tracking-wide" style={{ fontFamily: "'There Must Be', sans-serif" }}>UNIVERSAL PIZZA</h1>
              </div>
              <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="relative">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart ({cart.length})
                    {cart.length > 0 && (
                      <Badge className="ml-2 bg-green-600">${getTotalPrice()}</Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Your Order</DialogTitle>
                    <DialogDescription>Review your items before checkout</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground">Your cart is empty</p>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ${item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.length > 0 && (
                    <DialogFooter>
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>${getTotalPrice()}</span>
                        </div>
                        <Button className="w-full bg-[#d32f2f] hover:bg-[#b71c1c]" onClick={() => {
                          alert("Order placed successfully! Thank you for choosing Universal Pizza.");
                          setCart([]);
                          setOrderDialogOpen(false);
                        }}>
                          Place Order
                        </Button>
                      </div>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Hero Promotion Card */}
          <Card className="mb-8 border-4 border-[#d32f2f] overflow-hidden shadow-2xl">
            <div className="relative bg-[#d32f2f] p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative z-10 text-white">
                  <Badge className="mb-4 bg-yellow-400 text-black hover:bg-yellow-300">
                    <Star className="h-4 w-4 mr-1" />
                    Special Offer
                  </Badge>
                  <h2 className="text-5xl md:text-6xl font-bold mb-2">7.99$ PEPPERONI</h2>
                  <p className="text-3xl mb-2 font-semibold">OR</p>
                  <h2 className="text-5xl md:text-6xl font-bold mb-4">6.49$ SLICE + CAN</h2>
                  <p className="text-xl font-semibold bg-white/20 inline-block px-6 py-3 rounded-lg border-2 border-white">
                    IN STORE ONLY - LIMITED TIME OFFER
                  </p>
                </div>

                <div className="relative flex justify-center items-center gap-4">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-2xl transform hover:scale-105 transition-transform">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHBlcHBlcm9uaXxlbnwxfHx8fDE3ODA5Mjg1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Pepperoni Pizza"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-2xl transform hover:scale-105 transition-transform">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwaXp6YSUyMHBlcHBlcm9uaXxlbnwxfHx8fDE3ODA5Mjg1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Pizza Slice"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

        {/* Tabs Navigation */}
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2 mx-auto">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="booking">Book Table</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map(item => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pizza className="h-5 w-5 text-[#d32f2f]" />
                      {item.name}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-[#d32f2f]">${item.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-[#d32f2f] hover:bg-[#b71c1c]"
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Booking Tab */}
          <TabsContent value="booking">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6 text-[#d32f2f]" />
                  Reserve Your Table
                </CardTitle>
                <CardDescription>Book a table for your next visit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(613) 555-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select>
                    <SelectTrigger id="guests">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="3">3 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="5">5 people</SelectItem>
                      <SelectItem value="6">6+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-[#d32f2f] hover:bg-[#b71c1c]"
                  onClick={() => {
                    if (selectedDate && selectedTime) {
                      alert(`Reservation confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}!`);
                    } else {
                      alert("Please select a date and time");
                    }
                  }}
                >
                  Confirm Reservation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-[#d32f2f]" />
                    Visit Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-muted-foreground">223 Laurier Ave E</p>
                    <p className="text-muted-foreground">Ottawa, ON K1N 6P1</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </h3>
                    <p className="text-lg text-[#d32f2f] font-semibold">(613)-562-5555</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Hours
                    </h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                      <p>Saturday: 12:00 PM - 11:00 PM</p>
                      <p>Sunday: 12:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <iframe
                      title="Universal Pizza Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.6534891779!2d-75.68531!3d45.42153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05b0f3b6b3b3%3A0x3b3b3b3b3b3b3b3b!2s223%20Laurier%20Ave%20E%2C%20Ottawa%2C%20ON%20K1N%206P1!5e0!3m2!1sen!2sca!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl">About Universal Pizza</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Welcome to Universal Pizza, Ottawa's favorite pizzeria since 1995! We pride ourselves on serving
                  authentic, delicious pizzas made with the freshest ingredients and traditional recipes passed down
                  through generations.
                </p>
                <p>
                  Our commitment to quality means we make our dough fresh daily, use only premium mozzarella,
                  and source our toppings from local suppliers whenever possible. Whether you're craving a classic
                  pepperoni or something more adventurous, we have something for everyone.
                </p>
                <div className="bg-[#d32f2f]/10 p-6 rounded-lg border-l-4 border-[#d32f2f]">
                  <h3 className="font-semibold mb-2">Why Choose Us?</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Fresh ingredients, made daily</li>
                    <li>Family-friendly atmosphere</li>
                    <li>Dine-in, takeout, and delivery available</li>
                    <li>Catering services for events</li>
                    <li>Gluten-free and vegetarian options</li>
                  </ul>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Made by Lyfrano - SEG3525 Assignment 2
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-[#d32f2f] text-white border-t-8 border-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Pizza className="h-6 w-6" />
                Universal Pizza
              </h3>
              <p className="text-white/80">Simply Ottawa's best pizza !</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-white/80">223 Laurier Ave E</p>
              <p className="text-white/80">Ottawa, ON K1N 6P1</p>
              <p className="text-white/80">(613)-562-5555</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <p className="text-white/80">Mon-Fri: 11am - 10pm</p>
              <p className="text-white/80">Sat: 12pm - 11pm</p>
              <p className="text-white/80">Sun: 12pm - 9pm</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>&copy; By Lyfrano - SEG3525</p>
          </div>
        </div>
      </footer>
    </div>
  );
}