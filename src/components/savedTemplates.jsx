const SavedTemplates=({templates,onSelectTemplate})=>{

    console.log(templates, 123)
    return(
        <>
            <h2>Saved Email Templates</h2>
            <div>
                {templates.map((x, i) => {
                return <button onClick={()=>onSelectTemplate(x._id)}key={i}>Template {i+1}</button>;
                })}
            </div>
        </>
    )
}
export default SavedTemplates