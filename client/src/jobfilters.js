import './jobfilters.css'



const Jobfilters = (props)=>{
    const getEmployTypesList = ()=>{
        const {employTypeList} = props;

        return employTypeList.map((employ)=>{
            const {changeEmployType,getJobs} = props

            const onChangeEmployment = event =>{
                changeEmployType(event.target.value);
                
            };
            return(
                <li className='list1 mt-2' key = {employ.employTypeId} onChange={onChangeEmployment}>
                    <input type="checkbox" id={employ.employTypeId} value={employ.employTypeId}></input>
                    <label className='ml-3' htmlFor={employ.employTypeId}>{employ.label}</label>
                </li>
            )
        }
        )

        
    }

    const renderEmploy = ()=>(
        <div>
            <h4 className=''>Type of employment</h4>

            <ul>
                {getEmployTypesList()}
            </ul>
        </div>
    )

    const getSalaryRangeList = ()=>{
        const {salaryRangeList} = props;

        return salaryRangeList.map((salary)=>{
            const {changeSalaryRange,getJobs} = props

            const onChangeSalary  = () =>{
                changeSalaryRange(salary.salaryRangeId);

                console.log(salary.salaryRangeId)
                
            };
            return(
                <li className='list1 mt-2' key = {salary.salaryRangeId} onChange={onChangeSalary}>
                    <input type="radio" id={salary.salaryRangeId} value={salary.salaryRangeId} name='vasu'></input>
                    <label className='ml-3' htmlFor={salary.salaryRangeId}>{salary.label}</label>
                </li>
            )
        }
        )

        
    }

    const renderSalary = ()=>(
        <div>
            <h4 className=''>Salary range</h4>

            <ul>
                {getSalaryRangeList()}
            </ul>
        </div>
    )
    return(
        <>
        <div className="hr mt-3"></div>
        <div className="text-light list1 mt-3 ">{renderEmploy()}</div>
        <div className="hr mt-3"></div>
        <div className="text-light list1 mt-3 ">{renderSalary()}</div>
        
        </>
    )
}

export default Jobfilters