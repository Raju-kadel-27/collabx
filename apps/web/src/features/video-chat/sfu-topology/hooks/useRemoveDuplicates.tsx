export const useRemoveDuplicate = (arr) => {
    var duplicateFreeClients = []
    if (arr.length > 0) {
        duplicateFreeClients = arr.reduce((acc, current) => {
            const existingItem = acc.find((item) => item._id === current._id);
            if (!existingItem) {
                acc.push(current);
            }
            return acc;
        }, []);
    }
    return [duplicateFreeClients]
}