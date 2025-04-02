"use client"

import { useEffect, useState } from "react";
import { AuthService } from "@/app/backend/auth.service"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/ui/logout-button";

import { ShoppingCart } from "lucide-react";

export function UserNav() {
  const authService = new AuthService();
  const email = authService.getCurrentUserEmail();


  
  
  const initials = email?.[0]?.toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border border-primary/10">

            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
       
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-white/80 backdrop-blur-lg backdrop-saturate-150 border border-gray-200/20 shadow-xl"
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-900">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200/50" />
        <DropdownMenuItem className="text-red-600 cursor-pointer p-0 focus:bg-gray-100/80">
          <LogoutButton showIcon className="justify-start" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
