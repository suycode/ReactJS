import React, { useState, useEffect, useRef } from "react";
import BillDetail from "./BillDetail";
import billService from "../../services/billService";
import { Button, Table, Modal } from "antd";
import { EyeOutlined, PrinterOutlined } from "@ant-design/icons";
import convertDateToVietnameseFormat from './../../utils/convertDate';
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";

const BillList = () => {
  const contentRef = useRef(null);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const billCode = "123456789012";

  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleViewDetails = (bill) => {
    setSelectedBill(bill);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `${total.toLocaleString()} VND`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => convertDateToVietnameseFormat(date),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(item)}
          type="link"
        >
          Xem chi tiết
        </Button>
      ),
    },
  ]

  const fetchBills = async () => {
    billService.getBills().then((data) => setBills(data));
  }

  useEffect(() => {
    fetchBills()
  }, []);


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Danh sách hóa đơn</h2>
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={600}
        footer={null}
      >
        {isModalVisible && (
          <>
            <div ref={contentRef} >
              <div className="p-2">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Invoice #{selectedBill.id}</h3>
                      <p className="text-gray-600">Date: {convertDateToVietnameseFormat(selectedBill.date)}</p>
                    </div>
                    <div>
                      {/* <h3 className="text-xl font-semibold text-gray-800">Due Date</h3> */}
                      {/* <p className="text-gray-600">{selectedBill.dueDate}</p> */}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Bill To</h3>
                      <p className="text-gray-700">{selectedBill.customerName}</p>
                      <p className="text-gray-700">1 Trinh Van Bo, Thanh Xuan, Ha Noi</p>
                      <p className="text-gray-700">Example@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Table
                    dataSource={selectedBill.items}
                    columns={[
                      {
                        title: "Tên sản phẩm",
                        dataIndex: "name",
                        key: "name",
                      },
                      {
                        title: "Số lượng",
                        dataIndex: "quantity",
                        key: "quantity",
                      },
                      {
                        title: "Giá",
                        dataIndex: "price",
                        key: "price",
                        render: (price) => `${price.toLocaleString()} VND`,
                      },
                    ]}
                    pagination={false}
                    size="small"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Total</h3>
                    <p className="text-gray-600">{selectedBill.total.toLocaleString()} VND</p>
                  </div>
                </div>
                <div>
                  <Barcode
                    className="w-full"
                    value={billCode}
                    format="CODE128"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button>
                <PrinterOutlined style={{ fontSize: '20px' }} onClick={() => reactToPrintFn()} />
              </Button>
            </div>
          </>
        )}
      </Modal>
      <Table dataSource={bills} columns={columns} />
    </div >
  );
};

export default BillList;
