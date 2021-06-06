import React, { useState } from 'react';
import { connect } from "react-redux";
import { Actions as productActions } from "../../redux/product";
import {
  EuiCard,
  EuiIcon,
  EuiPageContent,
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

function NewCoffe({ 
  user,
  isLoadingProducts,
  data,
  fetchProducts,
  })
  {

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentProductId, setProductId] = useState("1");
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

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
                size="m"
                alt="Product"
                src={item.id%2?coffe:healthy}
              />
          </div>
          }
          textAlign="center"
          title={`${item.name} - ${item.price} €`}
          isDisabled={false}
          description={"Product Description and Nutritional Informations"}
          onClick={(e) => handleOpenModal(item.name, item.id)}
        />
      </EuiFlexItem>
    );
  });
  return (
    <EuiPanel paddingSize="s" hasShadow={false} hasBorder={false}> 
      <EuiCard layout="horizontal" title="Products" >
        <EuiFlexGrid columns={2} gutterSize="s">
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
  }),
  {
    fetchProducts: productActions.fetchProducts,
  }
  )(NewCoffe);
