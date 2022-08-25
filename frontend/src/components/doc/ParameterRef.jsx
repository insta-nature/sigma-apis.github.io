const ParameterRef =() => {
	return (
		<div className="css-1s63vs7 e1rvvg8g0">
		<span className="heading">API</span><br />
		<span className="sub-heading">API Doc</span>
			<table>
				<thead>
					<tr>
						<th width="17%">Prop name</th>
						<th width="25%">Type</th>
						<th width="9%">Default</th>
						<th width="9%">Required</th>
						<th width="40%">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>columns</td>
						<td><code className="css-1akakee e1by9rca0">Array&lt;{
								`"format": "Function",
								"isSortable": "Boolean",
								"label": "string",
								"name": "string"`
								}&gt;</code></td>
						<td>—</td>
						<td>true</td>
						<td>
							<p>Table data columns, optionally sortable. The <code>format</code> function can be used to process the
								column data before displaying them.</p>
						</td>
					</tr>
					<tr>
						<td>id</td>
						<td><code className="css-1akakee e1by9rca0">string</code></td>
						<td>undefined</td>
						<td>false</td>
						<td>
							<p>ID of the root HTML element. It also serves as base fo nested elements:</p>
							<ul>
								<li><code>&lt;ID&gt;__headerCell__&lt;COLUMN_NAME&gt;</code></li>
								<li><code>&lt;ID&gt;__headerCell__&lt;COLUMN_NAME&gt;__sortButton</code></li>
								<li><code>&lt;ID&gt;__bodyCell__&lt;COLUMN_NAME&gt;__&lt;ROW_ID&gt;</code></li>
							</ul>
						</td>
					</tr>
					<tr>
						<td>rows</td>
						<td><code className="css-1akakee e1by9rca0">Array&lt;{}&gt;</code></td>
						<td>—</td>
						<td>true</td>
						<td>
							<p>Table data rows, each object key must match a column <code>name</code></p>
						</td>
					</tr>
					<tr>
						<td>sort</td>
						<td><code className="css-1akakee e1by9rca0">{
								`"ascendingIcon": "node",
								"column": "string",
								"descendingIcon": "node",
								"direction": "'asc' │ 'desc'",
								"onClick": "Function"`
								}</code></td>
						<td>null</td>
						<td>false</td>
						<td>
							<p>Sorting configuration required to make columns sortable.</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);	
}

export default ParameterRef;
