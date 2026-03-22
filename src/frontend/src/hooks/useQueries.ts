import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      let products = await actor.getAllProducts();
      if (products.length === 0) {
        await actor.seedProducts();
        products = await actor.getAllProducts();
      }
      return products;
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetCartItems(cartId: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      if (!actor || !cartId) return [];
      return actor.getCartItems(cartId);
    },
    enabled: !!actor && !isFetching && !!cartId,
  });
}

export function useAddToCart(cartId: string) {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: bigint;
      quantity: bigint;
    }) => {
      if (!actor) return;
      try {
        await actor.createCart(cartId);
      } catch {
        // cart may already exist
      }
      await actor.addItemToCart(cartId, productId, quantity);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });
}

export function useRemoveFromCart(cartId: string) {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) return;
      await actor.removeItemFromCart(cartId, productId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });
}

export function useClearCart(cartId: string) {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.clearCart(cartId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });
}
