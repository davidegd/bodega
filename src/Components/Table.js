import React, { Component } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';

function Table({ ordersCopy }) {
	const columns = ['Cliente', 'Region', 'Ruta', 'Slot', 'Productos', ' % Alistado'];
	const data = [
		...ordersCopy.map(order => [
			order.user.name,
			order.region_code,
			order.routeId,
			order.slot,
			order.products.length,
			((order.count / order.products.length) * 100).toFixed(0),
		]),
	];

	const options = {
		filterType: 'dropdown',
		filterOptions: 'multiselect',
		responsive: 'stacked',
		rowsPerPage: 20,
		rowsPerPageOptions: [10, 20, 30],
		selectableRowsOnClick: false,
		filter: true,
	};
	return (
		<div>
			<MUIDataTable title={'Órdenes Entrantes'} data={data} columns={columns} options={options} />
		</div>
	);
}

const mapStateToProps = state => ({
	ordersCopy: state.reducer.ordersCopy,
});

export default connect(mapStateToProps)(Table);
