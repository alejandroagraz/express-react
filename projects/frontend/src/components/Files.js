import React from 'react';
import {useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';
function Files() {
    const { loading, files, success, error } = useSelector((state) => state.file)
    return  (
        <article>
            <div className="clearfix"></div>
            {
                files && files.length > 0 ? (
                    <div className='flex-vertical'>
                        <Table className='flags-table' responsive hover striped>
                            <thead className="table-dark">
                            <tr>
                                <th >File Name</th>
                                <th >Text</th>
                                <th >Number</th>
                                <th >Hex</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                files.length === 1 ? (
                                    files.map((file) => (
                                        file.lines.length > 0 ? (
                                            file.lines.map((line) => (
                                                <tr>
                                                    <td>{ file.file !== null ? (file.file) : ( <span>Undefined</span> ) }</td>
                                                    <td>{ line.text !== null ? (line.text) : ( <span>Undefined</span> ) }</td>
                                                    <td>{ line.number !== null ? (line.number) : ( <span>Undefined</span> ) }</td>
                                                    <td>{ line.hex !== null ? (line.hex) : ( <span>Undefined</span> ) }</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <div>
                                                <h2 className="subheader">File without information</h2>
                                                <p>There is no information to display</p>
                                            </div>
                                        )
                                    ))
                                ) : files.map((file) => (
                                    file[0].lines.length > 0 && (
                                        file[0].lines.map((line) => (
                                            <tr>
                                                <td>{ file[0].file !== null ? (file[0].file) : ( <span>Undefined</span> ) }</td>
                                                <td>{ line.text !== null ? (line.text) : ( <span>Undefined</span> ) }</td>
                                                <td>{ line.number !== null ? (line.number) : ( <span>Undefined</span> ) }</td>
                                                <td>{ line.hex !== null ? (line.hex) : ( <span>Undefined</span> ) }</td>
                                            </tr>
                                        ))
                                    )
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                ) : files.length === 0 && success === 'success' ? (
                    <div>
                        <h2 className="subheader">No hay articulos para mostrar</h2>
                        <p>There is no ar to show</p>
                    </div>
                ) : files.length === 0 ? (
                    <div>
                        <p>There is no ar to show</p>
                    </div>
                ) : error ? (
                    <div>
                        <p>An error occurred while viewing the files</p>
                    </div>
                ) : loading && (
                    <div>
                        <p>Please wait while the content loads</p>
                    </div>
                )
            }
        </article>
    )
}
export default Files;