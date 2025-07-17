


const Table = ({ headings, datas, onDelete, onEdit, onEditText}) => {
    return (
        <table border={1}>
            <thead>
                <tr>
                    {headings.map((head, idx) => (
                        <td key={idx}>{head}</td>
                    ))}
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {datas && datas.map((data, idx) => (
                    <tr key={data['id']}>
                        <td>{idx + 1}</td>
                        <td>{data['name']}</td>
                        <td>{data['price']}</td>
                        <td>{data['quantity']}</td>
                        <td>
                            <button onClick={() => onDelete(data['id'])}>Delete</button>
                            <button onClick={() => onEdit(data['id'])}>{onEditText}</button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
}


export default Table