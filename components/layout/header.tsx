// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ShoppingCart, User, Menu, Settings } from "lucide-react"
// import { useSelector } from "react-redux"
// import type { RootState } from "@/store/store"
// import { Badge } from "@/components/ui/badge"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function Header() {
//   const cartItemsCount = useSelector((state: RootState) =>
//     state.cart.items.reduce((total, item) => total + item.quantity, 0),
//   )

//   const navigation = [
//     { name: "Home", href: "/" },
//     { name: "Products", href: "/products" },
//     { name: "Customize", href: "/customize" },
//   ]

//   return (
//     <header className="bg-white shadow-sm border-b border-[#D1BFA7]/20">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-[#4A3F35] to-[#9A7B4F] rounded"></div>
//             <span className="text-xl font-bold font-serif text-[#2E2C2A]">ArtisanWall</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-[#2E2C2A] hover:text-[#9A7B4F] transition-colors font-medium"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center space-x-4">
//             {/* User Menu */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="hidden md:flex">
//                   <User className="h-5 w-5" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem asChild>
//                   <Link href="/orders">My Orders</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/profile">Profile</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link href="/admin" className="text-[#9A7B4F]">
//                     <Settings className="h-4 w-4 mr-2" />
//                     Admin Panel
//                   </Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <Button variant="ghost" size="icon" asChild className="relative">
//               <Link href="/cart">
//                 <ShoppingCart className="h-5 w-5" />
//                 {cartItemsCount > 0 && (
//                   <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#9A7B4F]">
//                     {cartItemsCount}
//                   </Badge>
//                 )}
//               </Link>
//             </Button>

//             {/* Mobile Menu */}
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="md:hidden">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent>
//                 <nav className="flex flex-col space-y-4 mt-8">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       className="text-[#2E2C2A] hover:text-[#9A7B4F] transition-colors font-medium text-lg"
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                   <Button variant="ghost" className="justify-start p-0 h-auto" asChild>
//                     <Link href="/orders">
//                       <User className="h-5 w-5 mr-2" />
//                       My Orders
//                     </Link>
//                   </Button>
//                   <Button variant="ghost" className="justify-start p-0 h-auto" asChild>
//                     <Link href="/admin">
//                       <Settings className="h-5 w-5 mr-2" />
//                       Admin Panel
//                     </Link>
//                   </Button>
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// components/layout/header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Customize", href: "/customize" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-[#D1BFA7]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-between h-16">
          {/* Logo always visible */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/wd-logo.png"
              alt="WallDecoratr Logo"
              width={48}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-serif font-bold text-[#2E2C2A] hidden sm:block">
              Wall Decorator
            </span>
          </Link>

          {/* Desktop nav + actions only */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#2E2C2A] hover:text-[#9A7B4F] transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User menu + cart */}
            <div className="flex items-center space-x-4">
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="text-[#9A7B4F]">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}

              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#9A7B4F]">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
