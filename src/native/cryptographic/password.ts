export class PasswordStrengthChecker {
  private _rating: number;

  constructor(rating: number) {
    if (rating < 1) {
      throw new Error("Rating must be at least 1.");
    }
    this._rating = rating;
  }

  public get rating(): number {
    return this._rating;
  }
  public set rating(value: number) {
    if (value < 1) {
      throw new Error("Rating must be at least 1.");
    }
    this._rating = value
  }

  public checkPasswordStrength(password: string): number {
      let strength = 0;

      // Check for password length
      if (password.length >= 8) strength++;
      if (password.length >= 12) strength++;

      // Check for uppercase letters
      if (/[A-Z]/.test(password)) strength++;

      // Check for lowercase letters
      if (/[a-z]/.test(password)) strength++;

      // Check for numbers
      if (/[0-9]/.test(password)) strength++;

      // Check for special characters
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      const maxPossibleStrength = 5;
      const normalizedStrength = Math.ceil((strength / maxPossibleStrength) * this.rating);
      return Math.min(normalizedStrength, this.rating);
  }
}


export function passwordCheckSimplify(password:string){
  const passchecker = new PasswordStrengthChecker(5);
  const result = passchecker.checkPasswordStrength(password);
  switch(result){
    case 1:
      return {
        rate:1,
        color:"red",
        name:"Weak",
      };
    case 2:
      return {
        rate:2,
        color:"orange",
        name:"Medium",
      };
    case 3:
      return {
        rate:3,
        color:"rgb(192, 141, 0)",
        name:"Strong",
      }
    case 4:
      return {
        rate:4,
        color:"green",
        name:"Very Strong",
      }
    case 5:
      return {
        rate:5,
        color:"blue",
        name:"Super Strong",
      }
    default:
      return {
        rate:0,
        color:"black",
        name:"Unknown",
      };
  }
}