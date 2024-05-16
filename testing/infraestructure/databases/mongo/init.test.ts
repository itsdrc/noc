import mongoose, { Mongoose, mongo } from "mongoose";
import { MongoDatabase } from '../../../../src/infraestructure/databases/mongo/init';

describe('MongoDataBase',()=>{

    const testUrl = 'test/myurl';

    const spyOnConnect = jest.spyOn(mongoose,'connect')
        .mockImplementation((url:string)=>Promise.resolve(new Mongoose()));

    const spyOnDisconnect =  jest.spyOn(mongoose,'disconnect')
        .mockImplementation(()=> Promise.resolve());

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('connect - should call connect from mongoose',async ()=>{

        await MongoDatabase.connect('');
        expect(spyOnConnect).toHaveBeenCalledTimes(1);

    });

    test('connect - connect from mongoose should be called with the given url', async () => {

        await MongoDatabase.connect(testUrl);
        expect(spyOnConnect).toHaveBeenCalledTimes(1);
        expect(spyOnConnect).toHaveBeenCalledWith(testUrl);

    });

    test('connect - should disconnect from mongoose', async () => {

        await MongoDatabase.disconnect();
        expect(spyOnDisconnect).toHaveBeenCalledTimes(1);

    });

});