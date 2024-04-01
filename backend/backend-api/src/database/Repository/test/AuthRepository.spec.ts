// import { AuthRepository } from '../AuthRepository';

// describe('AuthRepository', () => {
//     it('should create a user', async () => {
//         const mockUserModel = {
//             create: jest.fn().mockResolvedValue({ /* your mock user data here */ }),
//         };
//         const authRepository = new AuthRepository(mockUserModel);

//         const result = await authRepository.CreateUser('test@example.com', 'password123', 'salt123');

//         expect(result).toBeDefined();

//         expect(mockUserModel.create).toHaveBeenCalledWith({
//             email: 'test@example.com',
//             password: 'password123',
//             salt: 'salt123',
//             phone: '',
//             address: [],
//         });
//     });
// });
