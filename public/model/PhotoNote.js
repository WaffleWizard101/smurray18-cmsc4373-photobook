export class PhotoNote {
   //instance variables
   caption; description; uid; createdBy;
   imageName; imageURL; timestamp; sharedWith; docId;

   constructor(data) {
      if (!data) return;
      this.caption = data.caption
      this.description = data.description
      this.uid = data.uid;
      this.createdBy = data.createdBy;
      this.imageName = data.imageName;
      this.imageURL = data.imageURL;
      this.timestamp = data.timestamp;
      this.sharedWith = data['sharedWith'] || [];
   }

   set_docId(id) {
      this.docId = id;
   }

   toFirestore() {
      return {
         caption: this.caption,
         description: this.description,
         uid: this.uid,
         createdBy: this.createdBy,
         imageName: this.imageName,
         imageURL: this.imageURL,
         timestamp: this.timestamp,
         sharedWith: this.sharedWith
      }
   }

   static parseSharedWith(value) {
      if(!value) return [];
      const str = value.trim();
      const emails = str.split(/[,|;| ]/).map(e => e.trim())
                        .filter(e => e.length > 0);
      return emails;
   }

   static validateSharedWith(value) {
      const str = value.trim();
      if (str.length === 0) return '';
      const emailList = PhotoNote.parseSharedWith(str);
      let invalidMessage = '';
      for (let i = 0; i < emailList.length; i++) {
         //Accept only valid uco emails
         if (!(/^[0-9A-Za-z]+@uco.com$/
               .test(emailList[i])
            )) {
            invalidMessage += `${emailList[i]} `;
         }
      }
      return invalidMessage.trim();
   }
}