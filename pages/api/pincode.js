export default function handler(req, res){

    let pincodes = {
        "385535":["Deesa" , "Gujarat"],
        "110003" : ["Delhi", "Delhi"],
        "560017" : ["Karagpur", "West Bangal"],
        "560017" : ["Banglore", "Karnataka"]

    }
    res.status(200).json(pincodes);
}