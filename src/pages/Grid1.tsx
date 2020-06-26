import React, { useState } from 'react';
import Paper from "@material-ui/core/Paper";
import {
	SortingState,
	IntegratedSorting,
	PagingState,
	IntegratedPaging,
	FilteringState,
	IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
	Grid,
	Table,
	TableHeaderRow,
	TableFilterRow,
	PagingPanel,
	TableColumnResizing,
} from "@devexpress/dx-react-grid-material-ui";

//import Button from '@material-ui/core/Button';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import ArrowUpward from '@material-ui/icons/ArrowUpward';

// const SortingIcon = ({ direction }) => (
// 	direction === 'asc'
// 	  ? <ArrowUpward style={{ fontSize: '18px' }} />
// 	  : <ArrowDownward style={{ fontSize: '18px' }} />
//   );
  
// const SortLabel = ({ onSort, children, direction }) => (
// 	<div
// 	  onClick={onSort}
// 	>
// 	  {children}
// 	  {(direction && <SortingIcon direction={direction} />)}
// 	</div>
// );

// по сути, скопировал из
// /home/user/react2020/react-token/node_modules/@devexpress/dx-react-grid/dist/dx-react-grid.d.ts
declare type SortingDirection = 'asc' | 'desc';
interface Sorting {
  columnName: string;
  direction: SortingDirection;
}

interface Filter {
    columnName: string;
    operation?: string;
    value?: string;
}

export const Grid1 = (props: any) => {
	const {rows, columns} = props;
	const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'name', direction: 'asc' }]);
	const [filters, setFilters] = useState<Filter[]>([]); // здесь можно предустановить фильтр
	const baseUrl = "https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/";

	const [defaultColumnWidths] = useState([
		{ columnName: 'name', width: 250 },
		{ columnName: 'sex', width: 150 },
		{ columnName: 'city', width: 250 },
		{ columnName: 'car', width: 250 },
	]);

	// при кастомных метках сортировка работает, метка не отключается
	const columnsSortingExtensions = [
		{
			columnName: 'car',
			sortingEnabled: false,
		},
	];

	const columnsResizeExtensions = [
		{
			columnName: 'car',
			minWidth: 200,
			maxWidth: 300,
		},
	];

	return (
		<Paper>
			<h1>Grid1</h1>
			<h2>Links:</h2>
			<ul>
				<li>
					<a href={`${baseUrl}controlled-and-uncontrolled-modes/`} target="_blank" rel="noopener noreferrer">
						Controlled (Stateless) and Uncontrolled (Stateful) Modes (+ sorting)
					</a>
				</li>
				<li>
					<a href={`${baseUrl}column-resizing/`} target="_blank" rel="noopener noreferrer">
						Column Resizing
					</a>
				</li>
				<li>
					<a href={`${baseUrl}filtering/`} target="_blank" rel="noopener noreferrer">
						Filtering
					</a>
				</li>
			</ul>

			<Grid rows={rows} columns={columns}>
				<FilteringState
					filters={filters}
					onFiltersChange={setFilters}
				/>
				<IntegratedFiltering />
				<SortingState
					sorting={sorting}
					onSortingChange={setSorting}
					columnExtensions={columnsSortingExtensions} // отключаем сортировку
					// ломается при кастомизации меток
				/>
				<PagingState
					defaultCurrentPage={0}
					pageSize={5}
				/>
				<IntegratedSorting />
				<IntegratedPaging />
				<PagingPanel />
				<Table />
				<TableColumnResizing
					defaultColumnWidths={defaultColumnWidths}
					columnExtensions={columnsResizeExtensions}
				/>
				<TableHeaderRow
					showSortingControls
					//sortLabelComponent={SortLabel} // слетает отключение сортировки
				/>
				<TableFilterRow />
			</Grid>
		</Paper>
	);
};
