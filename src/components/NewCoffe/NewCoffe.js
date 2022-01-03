import React, { useState } from 'react';
import { connect } from "react-redux";
import { Actions as productActions } from "../../redux/product";
import {
  EuiCard,
  EuiIcon,
  EuiPageContent,
  EuiGlobalToastList,
  EuiPageContentBody,
  EuiImage,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiButton,
} from "@elastic/eui";
import coffe from "../../assets/img/coffe.svg";
import healthy from "../../assets/img/107-healthy.svg";
import cupcake from "../../assets/img/day81-ice-cream.svg";
import styled from "styled-components";
import NewCoffeForm from "./NewCoffeForm";

// Styling //
const StyledEuiImage = styled(EuiImage)`
  border-radius: 50% !important;
  max-width: 300px !important;
  max-height: 300px !important;
`;
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  max-width: 300px !important;
  max-height: 300px !important;
  & > img {
    width: 100% !important;
    border-radius: 50% !important;
  }
`;

const productImages = {
  "hot" : coffe ,
  "cold" : healthy,
  "eat" : cupcake
};

let addToastHandler;
let toastId = 0;

export function addToast() {
  addToastHandler();
}

function NewCoffe({ 
  user,
  isLoadingProducts,
  errorPurchase,
  data,
  fetchProducts,
  })
  {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentProductId, setProductId] = useState("1");
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  React.useEffect(() => {
    fetchProducts();
    if(errorPurchase && isModalVisible){
      addToast();
      closeModal();
    }
  }, [fetchProducts, errorPurchase]);

  let modal;
  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>{modalTitle}</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <NewCoffeForm id_={currentProductId}/>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton 
            color="danger" 
            onClick={closeModal} 
            fill
            iconSide="left"
            iconType="cross"
          >
            Close
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }
  const handleOpenModal = (product_name, product_id) => {
    setModalTitle(product_name);
    setProductId(product_id);
    showModal();
  };
  const cardNodes = data.map(function (item, index) {
    return (
      <EuiFlexItem key={index}>
        <EuiCard
          image={
            <div>
              <EuiImage
                size="s"
                alt="Product"
                src= {productImages[item.category]?productImages[item.category]:coffe}
              />
          </div>
          }
          textAlign="center"
          title={`${item.name} ${Number(item.price).toFixed(2)} €`}
          isDisabled={false}
          description={item.description}

          onClick={(e) => handleOpenModal(item.name, item.id)}
        />
      </EuiFlexItem>
    );
  });

  // Toast
  const [toasts, setToasts] = React.useState([]);

  addToastHandler = () => {
    const toast = getToast();
    setToasts(toasts.concat(toast));
  };
  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };


  return (
    <EuiPanel paddingSize="s" hasShadow={false} hasBorder={false}> 
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
      <EuiCard layout="horizontal" title="Products" >
        <EuiFlexGrid columns={4} gutterSize="s">
          {cardNodes}
        </EuiFlexGrid>
    </EuiCard>
    {modal}
  </EuiPanel>
  );
}


export default connect(
  (state) => ({ 
    user: state.auth.user,
    data: state.product.data,
    isLoadingProducts: state.product.isLoading,
    errorPurchase : state.purchase.error
  }),
  {
    fetchProducts: productActions.fetchProducts,
  }
  )(NewCoffe);

const getToast = () => {
  const toasts = [
    {
      title: "Could not concluded purchase! Please log in again",
      iconType: "alert",
      color: "danger",
      text: <p>Thanks for your patience!</p>
    }
  ];

  return {
    id: `toast${toastId++}`,
    ...toasts[Math.floor(Math.random() * toasts.length)]
  };
};