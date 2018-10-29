
const Client = require('node-rest-client').Client;
const client = new Client();
const searchBook = (text) => {
    return new Promise((resolve, reject) => {
        if (!text) {
            reject(new Error('Provide search text'));
        }
        const url = `${process.env.GOOD_READ_URI}${process.env.GOOD_READ_SEARCH_URI}?key=${process.env.GOOD_READ_DEVELOPER_KEY}&q=${text}`;
        client.get(url, {}, (data, response) => {
            if (Number(response.statusCode) === 200) {
                let result = {};
                if (data && data.GoodreadsResponse) {
                    result = data.GoodreadsResponse.search;
                }
                resolve(result);
            } else {
                reject(new Error("Error in good read API"));
            }
        });
    });
}

const bookDetail = (bookId) => {
    return new Promise((resolve, reject) => {
        if(!bookId){
            reject(new Error('Provide book Id'));
        }
        const url = `${process.env.GOOD_READ_URI}${process.env.GOOD_READ_BOOK_DETAIL}?key=${process.env.GOOD_READ_DEVELOPER_KEY}&id=${bookId}`;
        client.get(url, {}, (data, response) => {
            if (Number(response.statusCode) === 200) {
                let result = {};
                if (data && data.GoodreadsResponse) {
                    result = data.GoodreadsResponse.book;
                }
                resolve(result);
            } else {
                reject(new Error("Error in good read API"));
            }
        });
    });
}

const authorDetail = (authorId) =>{
    return new Promise((resolve, reject) => {
        if(!authorId){
            reject(new Error('Provide author Id'));
        }
        const url = `${process.env.GOOD_READ_URI}${process.env.GOOD_READ_AUTHOR_DETAIL}?key=${process.env.GOOD_READ_DEVELOPER_KEY}&id=${authorId}`;
        client.get(url, {}, (data, response) => {
            if (Number(response.statusCode) === 200) {
                let result = {};
                if (data && data.GoodreadsResponse) {
                    result = data.GoodreadsResponse.author;
                }
                resolve(result);
            } else {
                reject(new Error("Error in good read API"));
            }
        });
    });
}

module.exports = {
    searchBook,
    bookDetail,
    authorDetail
}