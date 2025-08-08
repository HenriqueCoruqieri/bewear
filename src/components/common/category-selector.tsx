import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
    categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({categories}: CategorySelectorProps) => {
    return (
        <div className="rounded-3xl p-6 bg-[#F4EFFF]">
            <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                    <Button key={category.id} variant="ghost" className="bg-white rounded-full">
                        <Link href={`/category/${category.slug}`}>{category.name}</Link>
                    </Button>
                ))}
            </div>
        </div>
    );
}
 
export default CategorySelector;