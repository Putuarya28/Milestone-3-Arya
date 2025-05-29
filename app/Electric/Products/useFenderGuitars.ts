import { useEffect, useState } from "react";
import { getFenderGuitars } from "@/lib/api";
import { Product } from "@/app/types/product";

let cache: Product[] | null = null;

export function useFenderGuitars() {
  const [guitars, setGuitars] = useState<Product[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    if (cache) {
      setLoading(false);
      return;
    }
    let isMounted = true;
    getFenderGuitars()
      .then((data) => {
        cache = data;
        if (isMounted) setGuitars(data);
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { guitars, loading };
}