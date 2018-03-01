const defaultResponse = {data: {}}
module.exports = {post: jest.fn(() => Promise.resolve(defaultResponse))}
