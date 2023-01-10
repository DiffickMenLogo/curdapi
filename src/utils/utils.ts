export function getReqData(req: any) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk: string) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}
