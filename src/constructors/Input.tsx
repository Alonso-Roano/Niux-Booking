interface DataProps {
    data:{ inputs: Array<{ [key: string]: any }>};
}

function Input({ data }: DataProps) { 
    return (
        <div>
            {data.inputs.map((prop, index) => (<input key={index} {...prop} />))}
        </div>
    );
}

export default Input;