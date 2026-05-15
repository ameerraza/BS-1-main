import { getOrderByUser } from "@/api/api";
import useToastStore from "@/stores/toastStore";
import { useLoaderStore } from "@/stores/useLoaderStore";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import ReviewModal from "./ReviewModal";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  userId: {
    id: string;
    name: string;
    email: string;
  };
  vendorId: {
    id: string;
    name: string;
    email: string;
  };
  productId: {
    id: string;
    name: string;
    price: number;
  };
  type: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  cnicNumber: string;
  address: string;
  city: string;
  transactionId: string;
  receiptImage: string;
  productPrice: number;
  deliveryCharges: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderHistory: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToastStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };
  useEffect(() => {
    doGetOrders();
  }, []);
  const doGetOrders = async () => {
    const id: any = Cookies.get("id");
    try {
      showLoader();
      const response = await getOrderByUser(id);
      console.log("response", response);
      if (response.success) {
        setOrders(response.orders);
        showToast("orders fetched", "success");
        hideLoader();
      } else {
        showToast("Failed to get orders", "error");
        hideLoader();
      }
    } catch (error) {
      console.error(error);
      showToast("Error getting orders", "error");
    }
    hideLoader();
  };

  const handleReviewSubmit = async (rating: number, review: string) => {
    try {
      // Add your API call here to submit the review
      showToast("Review submitted successfully", "success");
    } catch (error) {
      showToast("Failed to submit review", "error");
    }
  };

  const OrderDetailsModal = () => {
    if (!selectedOrder || !isDetailsModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Order Details</h2>
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Order Information</h3>
                <p className="text-sm">Order ID: {selectedOrder.id}</p>
                <p className="text-sm">
                  Date: {formatDate(selectedOrder.createdAt)}
                </p>
                <p className="text-sm">Status: {selectedOrder.status}</p>
              </div>
              <div>
                <h3 className="font-medium">Delivery Information</h3>
                <p className="text-sm">Name: {selectedOrder.fullName}</p>
                <p className="text-sm">Address: {selectedOrder.address}</p>
                <p className="text-sm">City: {selectedOrder.city}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Product Details</h3>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {selectedOrder.productId.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Type: {selectedOrder.type}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  ${selectedOrder.productPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    Subtotal: ${selectedOrder.productPrice.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    Delivery: ${selectedOrder.deliveryCharges.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold">
                    Total: ${selectedOrder.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {selectedOrder.status === "completed" && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    setIsReviewModalOpen(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Order History
            </h1>
            <p className="text-gray-600 text-sm">
              Track all your previous orders
            </p>
          </div>
          <button
            onClick={() => router.push("/search")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Place New Order
          </button>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Header Section */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-gray-900">
                        Order #{order.id}
                      </h2>
                      <span
                        className={`${getStatusColor(
                          order.status
                        )} px-2 py-0.5 rounded-full text-xs font-medium`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsReviewModalOpen(true);
                      }}
                      className="text-sm px-3 py-1 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDetailsModalOpen(true);
                      }}
                      className="text-sm px-3 py-1 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      {order.receiptImage && (
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={order.receiptImage}
                            alt="Receipt"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {order.productId.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Type: {order.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        ${order.productPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        Delivery: ${order.deliveryCharges.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Total Amount</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <OrderDetailsModal />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default OrderHistory;
