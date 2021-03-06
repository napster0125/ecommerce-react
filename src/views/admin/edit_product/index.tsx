import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom';

import useDocumentTitle from 'hooks/useDocumentTitle';
import { editProduct } from 'redux/actions/productActions';
import ProductForm from '../components/ProductForm';
import { IProduct, RootState } from 'types/types';
import useScrollTop from 'hooks/useScrollTop';

const EditProduct: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
	useDocumentTitle('Edit Product | Salinaka');
	useScrollTop();

	const { product, isLoading } = useSelector((state: RootState) => ({
		product: state.products.items.find(item => item.id === props.match.params.id),
		isLoading: state.app.loading
	}));
	const dispatch = useDispatch();

	const onSubmitForm = (updates: Partial<IProduct>) => {
		if (product) dispatch(editProduct(product.id, updates));
	};

	return (
		<div className="product-form-container">
			{!product && <Redirect to="/dashboard/products" />}
			<h2>Edit Product</h2>
			<ProductForm
				isLoading={isLoading}
				onSubmit={onSubmitForm}
				product={product}
			/>
		</div>
	);
};

export default withRouter(EditProduct);
