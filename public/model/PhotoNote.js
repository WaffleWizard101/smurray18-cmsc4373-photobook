export class PhotoNote {
   //instance variables
   caption; description; uid; createdBy;
   imageName; imageURL; timestamp; sharedWith; docId;

   constructor(data) {
      if(!data) return;
      this.caption = data.caption
      this.description = data.description
      this.uid = data.uid;
      this.createdBy = data.createdBy;
      this.imageName = data.imageName
      this.imageURL = data.imageURL;
      this.timestamp = data.timestamp;
      this.sharedWith = data['sharedWith'] || [];
   }
}