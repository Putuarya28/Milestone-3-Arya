import {
  getFenderGuitars,
  createProduct,
  getProductById,
} from "../api";

// Mock global fetch with correct type
global.fetch = jest.fn() as jest.Mock;

describe("API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getFenderGuitars", () => {
    it("returns products when fetch is successful", async () => {
      const mockProducts = [{ id: 1, title: "Fender Strat" }];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const data = await getFenderGuitars();
      expect(data).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith("https://api.escuelajs.co/api/v1/products");
    });

    it("throws error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(getFenderGuitars()).rejects.toThrow("Failed to fetch products");
    });
  });

  describe("createProduct", () => {
    it("returns new product when creation is successful", async () => {
      const newProduct = {
        title: "New Guitar",
        price: 1000,
        description: "A great guitar",
        categoryId: 1,
        images: ["https://example.com/image.jpg"],
      };
      const mockResponse = { id: 2, ...newProduct };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await createProduct(newProduct);
      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.escuelajs.co/api/v1/products",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        })
      );
    });

    it("throws error when creation fails", async () => {
      const newProduct = {
        title: "fail",
        price: 1000,
        description: "A great guitar",
        categoryId: 1,
        images: ["https://example.com/image.jpg"],
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        text: async () => "Bad Request",
      });
      await expect(createProduct(newProduct)).rejects.toThrow("Failed to create product");
    });
  });

  describe("getProductById", () => {
    it("returns product when fetch is successful", async () => {
      const mockProduct = { id: 1, title: "Fender Strat" };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const data = await getProductById(1);
      expect(data).toEqual(mockProduct);
      expect(fetch).toHaveBeenCalledWith("https://api.escuelajs.co/api/v1/products/1");
    });

    it("throws error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(getProductById(999)).rejects.toThrow("Product not found");
    });
  });
});