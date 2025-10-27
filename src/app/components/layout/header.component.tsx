'use client'
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import InputField from "../custom/inputField.component";
import { useForm } from "react-hook-form";
import CustomButton from "../custom/customButton.component";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/seatch.store";
import { useDebouncedCallback } from "@/hooks/useDebounce";

export const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState<boolean>(false);

    const { setSearchTerm } = useSearchStore();
    const debouncedSetSearch = useDebouncedCallback((value: string) => {
        setSearchTerm(value);
    }, 500);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; 

    if (pathname === '/login' || pathname === '/signup') return null;

    return (
        <header className="flex items-center justify-between p-4 p-x-20">
            <div className="flex items-center gap-2">
                <Image src="/icons/logo.svg" alt="FlavorAI Logo" width={40} height={40} />
                <h1 className="text-2xl font-bold">FlavorAI</h1>
            </div>
            {pathname === '/' &&   <input
                type="text"
                placeholder="Search..."
                onChange={(e) => debouncedSetSearch(e.target.value)}
                className="border rounded p-2"
            />}
            <CustomButton styles="w-30" onClick={pathname !== '/' ? () => {router.back()} : () => {router.push('/recipe/create')}}>{pathname === '/' ? 'Create' : 'Back'}</CustomButton>
        </header>
    )
}
