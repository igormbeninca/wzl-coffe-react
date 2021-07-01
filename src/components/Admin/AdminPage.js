import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from "react-redux";
import { Actions as usersActions } from "../../redux/users";
//import { fake } from 'faker';
import {
  EuiLoadingSpinner,
  EuiPanel,
  EuiCard,
  EuiPageTemplate,
} from '@elastic/eui';

import {AdminTable , NotFoundPage} from "../../components"


function AdminPage({fetchUsers, data, isLoading, error}){
    React.useEffect(() => {
        fetchUsers();
      }, [fetchUsers]);
    
    if (isLoading) return <EuiLoadingSpinner size="xl" />
    if (error) return <NotFoundPage/>

    const raw_data = [];
    data.forEach(element => {
    raw_data.push({
        id: element.id,
        full_name: element.full_name,
        email: element.email,
        saldo: parseFloat(element.saldo).toFixed(2),
        rfid : element.rfid,
        is_active: String(element.is_active),
        is_superuser:String(element.is_superuser)
    })
    });
    
    return(
      // <EuiPanel paddingSize="s">
      //   <EuiCard layout="horizontal" title="Users">
      //     <AdminTable raw_data = {raw_data}/>
      //   </EuiCard> 
      // </EuiPanel>
      <EuiPageTemplate 
        restrictWidth={false}
        pageHeader={{
          tabs: [
            { label: 'Users', isSelected: true },
            {
              label: 'Purchases',
              onClick: null,
            },
          ],
      }}>
        <AdminTable raw_data = {raw_data}/>
      </EuiPageTemplate>
    )
}
export default connect(
    (state) => ({
        data : state.users.data,
        isLoading : state.users.isLoading,
        error : state.users.error
    }),
    {
      fetchUsers: usersActions.fetchUsers,
    }
  )(AdminPage);