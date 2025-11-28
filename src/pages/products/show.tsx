import { useOne, useShow} from "@refinedev/core";

export const ShowProduct = () => {
    const {
        result,
        query: { isLoading },
    // } = useShow();
     } = useOne({ resource: "products", id: 123 });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Product name: { result?.name }</div>;
};