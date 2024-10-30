const checkJson = (json:any) => {return typeof json === 'object' && json !== null && Object.keys(json).length > 0}

export default {checkJson};