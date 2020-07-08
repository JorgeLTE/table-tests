import React from 'react';
import './App.css';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

function App() {
	const rowHeight = 90;
	const collapsibleHeight = 100
	const [openRow, setOpenRow] = React.useState(0);
	const customRenderer = (props) => rowRenderer({...props, rowHeight, collapsibleHeight, openRow})
	const getRowHeight = ({index}) => index === openRow ? rowHeight + collapsibleHeight : rowHeight;
	const tableRef = React.useRef(null);
	const onRowClick = ({index}) => {
		setOpenRow(index);
		tableRef.current.recomputeRowHeights();
	};
	return (
		<div className="App">
			<Table
				ref={tableRef}
				width={800}
				height={800}
				headerHeight={50}
				rowHeight={getRowHeight}
				rowCount={list.length}
				rowGetter={({ index }) => list[index]}
				rowClassName={rowClassName}
				headerClassName="columnHeader"
				rowRenderer={customRenderer}
				onRowClick={onRowClick}
			>
				<Column label="Product Name" dataKey="product" width={200} />
				<Column label="Category" dataKey="category" width={200} />
				<Column label="SKU" dataKey="sku" width={200} />
				<Column label="Stock" dataKey="stock" width={200} />
			</Table>
		</div>
	);
}

// function other(props) {
// 	return (<div>{rowRenderer({ ...props })}</div>);
// }

function rowClassName({ index }) {
	if (index < 0) {
		return 'headerRow';
	} else {
		return index % 2 === 0 ? 'evenRow' : 'oddRow';
	}
}

export default App;

const list = [...Array(100)].map(() => ({ product: 'Square shirt', category: 'Clothes', sku: '194837234923', stock: 15 }));

function rowRenderer({
	className,
	columns,
	index,
	key,
	onRowClick,
	onRowDoubleClick,
	onRowMouseOut,
	onRowMouseOver,
	onRowRightClick,
	rowData,
	style,
	rowHeight,
	collapsibleHeight,
}) {
	const a11yProps = { 'aria-rowindex': index + 1 };

	if (
		onRowClick ||
		onRowDoubleClick ||
		onRowMouseOut ||
		onRowMouseOver ||
		onRowRightClick
	) {
		a11yProps['aria-label'] = 'row';
		a11yProps.tabIndex = 0;

		if (onRowClick) {
			a11yProps.onClick = event => onRowClick({ event, index, rowData });
		}
		if (onRowDoubleClick) {
			a11yProps.onDoubleClick = event =>
				onRowDoubleClick({ event, index, rowData });
		}
		if (onRowMouseOut) {
			a11yProps.onMouseOut = event => onRowMouseOut({ event, index, rowData });
		}
		if (onRowMouseOver) {
			a11yProps.onMouseOver = event => onRowMouseOver({ event, index, rowData });
		}
		if (onRowRightClick) {
			a11yProps.onContextMenu = event =>
				onRowRightClick({ event, index, rowData });
		}
	}

	return (
		<div
			{...a11yProps}
			key={key}
			role="row"
			style={style}
			className="rowWrapper animated"
		>
			<div
				className={`${ className }`}
				style={{height: rowHeight}}
			>
				{columns}
			</div>
			<div className="collapsibleContent" style={{height: collapsibleHeight}}>
				Hello, I'm a collapsible row
			</div>
		</div>
	);
}