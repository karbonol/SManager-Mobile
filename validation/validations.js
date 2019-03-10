export default function validate(subject,text){
    const regex=(subject=='username'?/^[a-zA-Z0-9\s\'_\.]{5,20}$/:/^[a-zA-Z0-9\'@\-_\.!\^\*\(\)#\$\%]{5,18}$/)
    if (regex.test(text))
        return true;
    else
        return false;
}
